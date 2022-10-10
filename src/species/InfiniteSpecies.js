// Imports
import React from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import Species from "./Species";

// URL
const initialUrl = 'https://swapi.dev/api/species/';

// Get data
const fetchUrl = async(url) => {
	const response = await fetch(url);
	return response.json();
};

// Component
const InfiniteSpecies = () => {

	// Get data for InfiniteScroll via React Query
	const { data, isLoading, isFetching, isError, error, hasNextPage, fetchNextPage } = useInfiniteQuery('sw-species', 
		({ pageParam = initialUrl }) => { return fetchUrl(pageParam); }, {
			// Options
			getNextPageParam:(lastPage) => {
				return lastPage.next || undefined;
			}
		});

	// Returns
	if (isLoading){
		return <div className="loading">Loading...</div>;
	}
	if (isError){
		return <div>Error ! { error.toString() }</div>;
	}
	return(
		<React.Fragment>
			{
				isFetching && <div className="loading">Loading...</div>
			}
			<InfiniteScroll loadMore={ fetchNextPage } hasMore={ hasNextPage }>
				{
					data.pages.map((pageData) => {
						return pageData.results.map((specie) => {
							const { name, language, average_lifespan:averageLifespan } = specie;
							return <Species key={ name } name={ name } language={ language } averageLifespan={ averageLifespan }/>
						});
					})
				}
			</InfiniteScroll>
		</React.Fragment>
	);

};

// Export
export default InfiniteSpecies;