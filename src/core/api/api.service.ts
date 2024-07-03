class ApiService {
  public async getSearchResult({ query, category }: { query: string; category: string }) {
    try {
      const response = await fetch(`https://swapi.dev/api/${category}/?search=${query}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return error;
    }
  }
}

export default ApiService;
