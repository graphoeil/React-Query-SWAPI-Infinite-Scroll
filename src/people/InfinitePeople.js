// Imports
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import Person from "./Person";

// URL
const initialUrl = 'https://swapi.dev/api/people/';

// Get data
const fetchUrl = async(url) => {
	const response = await fetch(url);
	return response.json();
};

/* useInfiniteQuery
It's an object with two properties :
1/ pages : array of objects for each page of data
2/ pageParams : params for every pages (rarely used) */

/* The flow, how infinite query works
1/ Component mounts, at this point "data" => const { data } = useInfiniteScroll is undefined
2/ Fetch the first page => useInfiniteScroll({ pageParam = defaultUrl })
3/ Then "data" will get first page object => data.pages[0]
4/ Then React Query will run getNexPageParam:(lastPage, allPages) this will update the "pageParam" 
	to pageParam:'http://swapi.dev/api/people/?page=2' this is provided by sw api 
5/ Do we have nextPage ? At this point yes becase pageParam is defined ,-) 
6/ Then React Query trigger fetchNextPage function when user scrolls or click button 
7/ Then React Query re-run useInfiniteScroll({ pageParam = defaultUrl }) (2) 
8/ Which updates the data => data.pages[1] (3) 
9/ Etc ... */

/* Bi-directional scrolling
Useful when starting in the middle
All next methods and properties (fetchNexPage, hasNextPage, getNextPageParam) have equivalent for previous. */

// Component
const InfinitePeople = () => {

	// Get data for InfiniteScroll via React Query
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery('sw-people', 
		({ pageParam = initialUrl }) => { return fetchUrl(pageParam); }, {
			// Options
			getNextPageParam:(lastPage) => {
				// If no .next then return undefined to stop inifinite query
				return lastPage.next || undefined;
			}
		});

	// Returns
	if (isLoading){
		return(
			<div className="loading">
				Loading...
			</div>
		);
	}
	if (isError){
		return(
			<div>
				Error ! { error.toString() }
			</div>
		);
	}
	return(
		<React.Fragment>
			{
				// Here to display loading when adding more data after first render
				isFetching && <div className="loading">Loading...</div>
			}
			<InfiniteScroll loadMore={ fetchNextPage } hasMore={ hasNextPage }>
				{
					data.pages.map((pageData) => {
						return pageData.results.map((person) => {
							const { name, hair_color:hairColor, eye_color:eyeColor } = person;
							return <Person key={ name } name={ name } hairColor={ hairColor } eyeColor={ eyeColor }/>
						})
					})
				}
			</InfiniteScroll>
		</React.Fragment>
	);

};

// Export
export default InfinitePeople;