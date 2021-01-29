export interface EventInfo {
    name: string;
    imageURL: string;
    localDate: string;
    city: string;
    country: string;
    eventURL: string;
    shouldBeHidden: boolean;
    isFavorite: boolean;
    venueName?: string;
    venueAddress?: string;
    priceRangeMax?: number;
    priceRangeMin?: number;
    description?: string;
    seatmap: string;
}