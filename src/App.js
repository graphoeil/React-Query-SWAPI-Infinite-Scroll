// Imports
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import InfinitePeople from "./people/InfinitePeople";

// Query client
const queryClient = new QueryClient();

// Component
const App = () => {

	// Return
	return(
		<QueryClientProvider client={ queryClient }>
			<h1>Infinite SWAPI</h1>
			<InfinitePeople/>
			<ReactQueryDevtools/>
		</QueryClientProvider>
	);

};

// Export
export default App;