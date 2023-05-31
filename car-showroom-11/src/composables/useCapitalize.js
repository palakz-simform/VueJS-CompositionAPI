export const useCapitalize = () => {
    function formattedString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return { formattedString }
}
