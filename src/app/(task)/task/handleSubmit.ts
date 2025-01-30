// Function to handle form submission
export const handleSubmit = async (videoId: string, startTime: number, endTime: number, notes: string) => {
    try {
        console.log(notes);
        const token = sessionStorage.getItem("jwt");
        const response = await fetch(
            "http://localhost:3000/api/v1/user-routes/operational-definitions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ videoId, startTime, endTime, notes }), // Send the video data and notes
            }
        );
        if (response.ok) {
            const responseBody = await response.json(); // Get the response body
            const { cosineSim, dotProduct } = responseBody; // Destructure the response
            console.log("Notes submitted successfully!");
            console.log("Response Body:", responseBody); // Log full response body
            console.log("cosineSim:", cosineSim); // Example destructured data
            console.log("dotProduct:", dotProduct); // Example destructured data
        } else {
            console.error("Error submitting notes");
        }
    } catch (e) {
        console.log(e);
    }
};
