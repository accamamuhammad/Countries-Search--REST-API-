## code explained

1. All the useState were called.
2. Empty arrays were created to store each region.
3. Toggle for theme to toggle between light and dark mode.
4. Toggle for filter to make it not visible when a region is selected for a better user experience
5. A for loop was created to iterate through all of the countries and categorize them into their respective regions
6. If and else if statements were used to add the regions arrays to their respective states
7. useEffect to avoid pointless rerendering
8. The users first letter was turned to uppercase was because the first letter of the name of the coutries in the data were all uppercase so for better user experince the first letter is automatically converted
9. The name of the country is searched for based on the users input and if statement was used to re-rendering that part of the code when the user input was empty
10. A map function was used to iterate over the currentRegion array the currentRegion array was changed based on the filter or all countries when none were selected
