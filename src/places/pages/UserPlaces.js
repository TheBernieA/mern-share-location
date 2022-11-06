import PlaceList from "../components/PlaceList";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire state building",
//     description: "Famous sky scapper",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg",
//     address: "20 W 34th St., New York, NY 10001, United States",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9856644,
//     },
//     creator: 'u1'
//   },
//   {
//     id: "p2",
//     title: "Empire state building",
//     description: "Famous sky scapper",
//     imageUrl:
//       "https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg",
//     address: "20 W 34th St., New York, NY 10001, United States",
//     location: {
//       lat: 40.7484405,
//       lng: -73.9856644,
//     },
//     creator: 'u2'
//   },
// ];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const params = useParams().userId;
  // const loadedPlaces = DUMMY_PLACES.filter(place=> place.creator === params)
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:3000/api/places/user/${params}`
        );
        setLoadedPlaces(response.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, params]);

  const placeDeletedHandler = (deletedPlaceId)=>{
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place=> place.id !== deletedPlaceId))
  }
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
    </Fragment>
  );
};

export default UserPlaces;
