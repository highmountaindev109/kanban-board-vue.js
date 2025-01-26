export default async function fetchData() {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
        throw new Error('Failed to fetch tickets');
    }
    
    const data = await response.json();
    console.log("fetchdata", data)
    return data; // Ensure it always returns an array
}
