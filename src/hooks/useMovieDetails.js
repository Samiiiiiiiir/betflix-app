import {
  useGetOneFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../services/kinopoiskApi';

export default function useMovieDetails(id) {
  const {
    data: filmData,
    isLoading,
    isFetching,
    isError,
  } = useGetOneFilmQuery(id);

  const {
    data: sequelsAndPrequeslsData,
    isLoading: isSequelsAndPrequeslsLoading,
    isFetching: isSequelsAndPrequelsFetching,
    isError: isSequelsAndPrequelsError,
  } = useGetSequelsAndPrequelsQuery(id);

  const {
    data: staffData,
    isLoading: isStaffLoading,
    isFetching: isStaffFetching,
    isError: isStaffError,
  } = useGetStaffQuery(id);

  const loadingStatus =
    isLoading ||
    isFetching ||
    isSequelsAndPrequeslsLoading ||
    isSequelsAndPrequelsFetching ||
    isStaffLoading ||
    isStaffFetching;

  const errorStatus = isError || isSequelsAndPrequelsError || isStaffError;

  return {
    loadingStatus,
    errorStatus,
    filmData,
    sequelsAndPrequeslsData,
    staffData,
  };
}
