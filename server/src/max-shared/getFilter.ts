type Filters = { [key: string]: any };
type DynamicFilter = { [key: string]: any };

export const getFilters = (filters: Filters): DynamicFilter => {
    const filter: DynamicFilter = {};
    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const value = filters[key];
            filter[key] = value;
        }
    }

    const cleanFilter = Object.fromEntries(Object.entries(filter).filter(([_, value]) => value !== undefined));
    return cleanFilter;
};

// Example usage:
// const userFilters: Filters = { session: '2023', status: 'active', category: 'sports' };
// const filterObject = getFilters(userFilters);