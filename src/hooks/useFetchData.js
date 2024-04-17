export async function useFetchData(endpoint) {

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}