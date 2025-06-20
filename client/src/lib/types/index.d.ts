

// here we can make typos easily because the manueal entering. 
// this is the responce from the http get so pasting this into 
// json to typescript 

// id	"4ae810f6-6f23-49ce-8ceb-9f3604e59f8d"
// title	"Future Activity 1"
// date	"2025-07-19T00:21:43.2691177"
// description	"Activity 1 month in future"
// category	"culture"
// isCancelled	false
// city	"London"
// venue	"Natural History Museum"
// latitude	51.496510900000004
// longitude	-0.17600190725447445
type Activity = {
    id: string;
    title: string;
    date: string; // ISO string format
    description: string;
    category: string;
    isCancelled: boolean;
    city: string;
    venue: string;
    latitude: number;
    longitude: number;
}