class ApiService {
  public async getSearchResult({ query }: { query: string }) {
    try {
      const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return error;
    }
  }
}

export default ApiService;
