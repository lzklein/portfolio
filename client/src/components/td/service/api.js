export const fetchScore = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/scores");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched scores:", data);
  } catch (error) {
    console.error("Failed to fetch scores:", error);
  }
};