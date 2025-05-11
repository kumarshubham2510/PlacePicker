export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update places");
  }
}
export async function fetchUserPlaces() {
  const respose = await fetch("http://localhost:3000/user-places");
  const resData = await respose.json();

  if (!respose.ok) {
    throw new Error("Failed to User Selected places");
  }
  return resData.places;
}
