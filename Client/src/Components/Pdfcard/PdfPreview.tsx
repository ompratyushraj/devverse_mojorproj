import { useParams } from 'react-router-dom';

const PdfPreview = () => {
    const params = useParams();
    
    // Extract the wildcard parameter (e.g., `*` route parameter in React Router v6+)
    const url = params["*"]; // Assuming your route captures the wildcard
console.log(url,"this is url")
    // Clean the URL to ensure no extra characters
    const cleanLink = decodeURIComponent(url || "").replace(/^"(.*)"$/, "$1");
console.log(cleanLink,"this is cleanLink")

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <iframe
                src={cleanLink}
                width="100%"
                height="100%"
                title="PDF Viewer"
            />
        </div>
    );
};

export default PdfPreview;
