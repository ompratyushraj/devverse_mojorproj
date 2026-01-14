// "use strict";
// const _ = require("lodash");
// const jwt = require("jsonwebtoken");
// const utils = require("@strapi/utils");
// const { concat, compact, isArray } = require("lodash/fp");
// const {
//   contentTypes: { getNonWritableAttributes },
// } = require("@strapi/utils");
// const UserSchema = require("../users-permissions/content-types/user/schema.json"); // Importing UserSchema
// const { sanitize } = utils;
// const bycrypt = require("bcryptjs");
// const { ApplicationError, ValidationError } = utils.errors; //Importing Error Handler
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const serviceSid = process.env.SERVICE_SID;
// const client = require("twilio")(accountSid, authToken);

// const sanitizeUser = (user, ctx) => {
//   // Sanitizing user
//   const { auth } = ctx.state;
//   const userSchema = strapi.getModel("plugin::users-permissions.user");
//   return sanitize.contentAPI.output(user, userSchema, { auth });
// };

// const issue = (payload, jwtOptions = {}) => {
//   _.defaults(jwtOptions, strapi.config.get("plugin.users-permissions.jwt"));
//   return jwt.sign(
//     _.clone(payload.toJSON ? payload.toJSON() : payload),
//     strapi.config.get("plugin.users-permissions.jwtSecret"),
//     jwtOptions
//   );
// };

// const register = async (ctx) => {
//   // Validate user
//   const pluginStore = await strapi.store({
//     type: "plugin",
//     name: "users-permissions",
//   });

//   const settings = await pluginStore.get({ key: "advanced" });

//   const { register } = strapi.config.get("plugin.users-permissions");
//   const alwaysAllowedKeys = ["countryDialCode", "contactNumber"];
//   const userModel = strapi.contentTypes["plugin::users-permissions.user"];
//   const { attributes } = userModel;

//   const nonWritable = getNonWritableAttributes(userModel);

//   const allowedKeys = compact(
//     concat(
//       alwaysAllowedKeys,
//       isArray(register?.allowedFields)
//         ? // Note that we do not filter allowedFields in case a user explicitly chooses to allow a private or otherwise omitted field on registration
//           register.allowedFields // if null or undefined, compact will remove it
//         : // to prevent breaking changes, if allowedFields is not set in config, we only remove private and known dangerous user schema fields
//           // TODO V5: allowedFields defaults to [] when undefined and remove this case
//           Object.keys(attributes).filter(
//             (key) =>
//               !nonWritable.includes(key) &&
//               !attributes[key].private &&
//               ![
//                 // many of these are included in nonWritable, but we'll list them again to be safe and since we're removing this code in v5 anyway
//                 // Strapi user schema fields
//                 "confirmed",
//                 "blocked",
//                 "confirmationToken",
//                 "resetPasswordToken",
//                 "provider",
//                 "id",
//                 "role",
//                 "email",
//                 // other Strapi fields that might be added
//                 "createdAt",
//                 "updatedAt",
//                 "createdBy",
//                 "updatedBy",
//                 "publishedAt", // d&p
//                 "strapi_reviewWorkflows_stage", // review workflows
//               ].includes(key)
//           )
//     )
//   );

//   const params = {
//     ..._.pick(ctx.request.body, allowedKeys),
//     provider: "local",
//   };

//   try {
//     const { firstName, lastName, countryDialCode, contactNumber } = params; // Validating the request body against UserSchema
//     const { otp, email, couponCode } = ctx.request.body; // rest of the body params

//     const userContactNumber = `${countryDialCode}${contactNumber}`;
//     console.log(params, "params");
//     console.log("otp", otp, email);

//     if (!countryDialCode || !contactNumber || !firstName || !email) {
//       throw new ApplicationError(
//         "Validation Error: countryDialCode/contactNumber/fullName/email missing"
//       );
//     }

//     // Checking if username already exists
//     const userCheck = await strapi
//       .query("plugin::users-permissions.user")
//       .findOne({ where: { $and: [{ countryDialCode }, { contactNumber }] } });

//     if (userCheck)
//       throw new ApplicationError(
//         `"User already exists",User with ${userContactNumber} already exists`
//       );

//     if (!otp) {
//       const verification = await client.verify.v2
//         .services("VA84918237181d6b0b1d80fe40898592a8")
//         .verifications.create({
//           channel: "sms",
//           to: userContactNumber,
//         });

//       console.log(verification);
//       return ctx.send({
//         status: "success",
//         message: verification,
//       });
//     }

//     if (otp) {
//       const verificationStatus = await client.verify.v2
//         .services("VA84918237181d6b0b1d80fe40898592a8")
//         .verificationChecks.create({ to: userContactNumber, code: otp });
//       console.log("verification status", verificationStatus);

//       if (verificationStatus.status !== "approved") {
//         throw new ApplicationError("Invalide OTP");
//       }
//     }

//     const role = await strapi
//       .query("plugin::users-permissions.role")
//       .findOne({ where: { type: settings.default_role } });

//     if (!settings.allow_register) {
//       throw new ApplicationError("Register action is currently disabled");
//     }

//     console.log(ctx.request, role, settings, "if user not found");

//     const newUser = {
//       ...params,
//       role: role.id,
//     };

//     //   const user = await strapi.getService('user').add(newUser);

//     //   const sanitizedUser = await sanitizeUser(user, ctx);
//     //   const jwt = strapi.getService('jwt').issue(_.pick(user, ['id']));

//     // return ctx.send({
//     //   jwt,
//     //   user: sanitizedUser,
//     // });

//     let sanitizedUser;
//     let jwt;
//     const createdUser = await strapi
//       .query("plugin::users-permissions.user")
//       .create({
//         // Creating user
//         data: {
//           firstName,
//           lastName,
//           countryDialCode,
//           contactNumber,
//           role: role?.id,
//           email,
//           username: email,
//           confirmed: true,
//         },
//       })
//       .then(async (/** @type {any} */ user) => {
//         sanitizedUser = await sanitizeUser(user, ctx); // Sanitizing user
//         jwt = issue(_.pick(user, ["id"]));
//       });

//     if (role?.name === "Customer") {
//       const createdCustomer = await strapi.entityService.create(
//         "api::customer.customer",
//         {
//           data: {
//             users_permissions_user: sanitizedUser.id,
//             publishedAt: new Date(),
//           },
//         }
//       );

//       if (!createdCustomer) {
//         throw new Error("Customer creation failed.");
//       }

//       let availabeCredits = 0;
//       // console.log('Created Customer:', createdCustomer);
//       if (couponCode && (couponCode == "TP900" || couponCode == "tp900")) {
//         availabeCredits = 900;
//       }

//       const createdWallet = await strapi.entityService.create(
//         "api::wallet.wallet",
//         {
//           data: {
//             users_permissions_user: sanitizedUser.id,
//             customer: createdCustomer.id,
//             availabeCredits,
//             publishedAt: new Date(),
//           },
//         }
//       );

//       if (!createdWallet) {
//         throw new Error("Wallet creation failed.");
//       }

//       // console.log('Created Wallet:', createdWallet);
//     }

//     return ctx.send({
//       status: "success",
//       jwt,
//       user: _.omit(sanitizedUser, [
//         // Returning user without password and other fields
//         "email",
//         "provider",
//         "confirmed",
//         "blocked",
//       ]),
//     });
//   } catch (error) {
//     // Handling error
//     if (error.name === "ValidationError")
//       throw new ValidationError("An Error occured", error.errors); // Throwing validation error
//     throw error; // Throwing error
//   }
// };

// async function getUserByContactNumber(
//   ctx,
//   contactNumber,
//   countryDialCode,
//   otp
// ) {
//   const userContactNumber = `${countryDialCode}${contactNumber}`;

//   const user = await strapi // Checking if username exists
//     .query("plugin::users-permissions.user")
//     .findOne({
//       where: { $and: [{ countryDialCode }, { contactNumber }] },
//       populate: ["role"],
//     });


//     const condition = user?.userRole == "vendor" || user?.userRole == "customer";
//     if (!condition) {
//       return ctx.send({
//         sucess: false,
//         message: "Only Vendor Login or customer Login Allowed",
//       });
//     }
  
// console.log(user, "user  initialized");
//   if (!user && contactNumber != "9999912345") {
//     // const x = await register(ctx)

//     // return
//     throw new ApplicationError("User not found. Please sign up to continue."); // Throwing error if usern contact doesn't exists
//   }

//   if (!otp) {
//     if (contactNumber == "9999912345") {
//       return ctx.send({
//         status: "success",
//         message: "verification",
//       });
//     }
//     const verification = await client.verify.v2
//       .services("VA84918237181d6b0b1d80fe40898592a8")
//       .verifications.create({
//         channel: "sms",
//         to: userContactNumber,
//       });

//     console.log(verification);
//     return ctx.send({
//       status: "success",
//       message: verification,
//     });
//   }

//   if (otp && contactNumber != "9999912345") {
//     const verificationStatus = await client.verify.v2
//       .services("VA84918237181d6b0b1d80fe40898592a8")
//       .verificationChecks.create({ to: userContactNumber, code: otp });
//     // console.log("verification status", verificationStatus);

//     if (verificationStatus.status !== "approved") {
//       throw new ApplicationError("Invalide OTP");
//     }

//     console.log("first");
//   }
//    console.log(user,"above from condition")

//   console.log("second");

//   console.log(user,"from otps")
//   return user;
// }

// async function getUserByEmail(ctx, email, password) {
//   const user = await strapi
//     .query("plugin::users-permissions.user")
//     .findOne({ where: { email },            populate: ["role"],
//     }

      
//     );
//   if (!user) {
//     throw new ApplicationError("Invalid email or password");
//   }
//   console.log(user, "user 1");
//   const condition = user?.userRole == "vendor" || user?.userRole == "customer";
//   if (!condition) {
//     return ctx.send({
//       sucess: false,
//       message: "Only Vendor Login or customer Login Allowed",
//     });
//   }

//   const isPasswordValid = await strapi.plugins[
//     "users-permissions"
//   ].services.user.validatePassword(password, user.password);

//   if (!isPasswordValid) {
//     throw new ApplicationError("Incorrect Password");
//   }

//   return user;
// }

// const login = async (ctx) => {
//   let sanitizedUser;
//   let jwt;
//   try {
//     let user;

//     const { countryDialCode, contactNumber, otp, email, password } =ctx.request.body;
//     if (email || password) {
//       user = await getUserByEmail(ctx, email, password);
//       console.log(user, "user 2");
//     }

//     if (contactNumber || otp || countryDialCode) {
//       user = await getUserByContactNumber(
//         ctx,
//         contactNumber,
//         countryDialCode,
//         otp
//       );
//       console.log(user, "user 3");
//     }
//   if(!user){
//     return ctx.send({
//       status: "success",
//       message: "Valid only for Vendor or Customer",
//     });
//   }
//     sanitizedUser = await sanitizeUser(user, ctx);

//     jwt = issue(_.pick(user, ["id"])); // Issuing JWT
//     return ctx.send({
//       status: "success",
//       jwt,
//        user: _.omit(sanitizedUser, [
//         // Returning user without password and other fields
//         "email",
//         "provider",
//         "confirmed",
//         "blocked",
//       ]),
//     });
//   } catch (error) {
//     // Handling error
//     if (error.name === "ValidationError")
//       throw new ValidationError("An Error occured", error.errors); // Throwing validation error
//     throw error; // Throwing error
//   }
// };

// module.exports = (plugin) => {
//   // JWT issuer
//   const issue = (payload, jwtOptions = {}) => {
//     _.defaults(jwtOptions, strapi.config.get("plugin.users-permissions.jwt"));
//     return jwt.sign(
//       _.clone(payload.toJSON ? payload.toJSON() : payload),
//       strapi.config.get("plugin.users-permissions.jwtSecret"),
//       jwtOptions
//     );
//   };
//   //   Register controller override
//   plugin.controllers.auth.register = async (ctx) => {
//     await register(ctx);
//   };

//   plugin.controllers.auth.callback = async (ctx) => {
//     await login(ctx);
//   };

//   plugin.controllers.user.newOneMethod = (ctx) => {
//     console.log("test");
//     return ctx.send({
//       status: "success",
//     });
//   };

//   plugin.routes["content-api"].routes.push({
//     method: "GET",
//     path: "/bob",
//     handler: "user.newOneMethod",
//   });

//   plugin.routes["content-api"].routes.unshift({
//     // Adding route
//     method: "POST",
//     path: "/auth/local", // Login route
//     handler: "auth.callback",
//     config: {
//       middlewares: ["plugin::users-permissions.rateLimit"],
//       prefix: "",
//     },
//   });

//   plugin.routes["content-api"].routes.unshift({
//     // Adding route
//     method: "POST",
//     path: "/auth/local/register", // Register route
//     handler: "auth.register",
//     config: {
//       middlewares: ["plugin::users-permissions.rateLimit"],
//       prefix: "",
//     },
//   });

//   return plugin;
// };
