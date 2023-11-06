export function parseError(error: any) {
  const result = {
    errorMessage: "",
    errorDetails: [] as string[]
  };
  if (error.exception) {
    result.errorMessage = error.exception;
  }
  if (error.message) {
    if (Array.isArray(error.message)) {
      result.errorDetails = error.message;
    } else {
      result.errorMessage = error.message;
    }
  }
  if (error.response) {
    const parsedResponse = JSON.parse(error.response);
    if (parsedResponse.errors) {
      result.errorDetails = Object.values<string[]>(parsedResponse.errors).flat();
    }
    if (parsedResponse.message) {
      result.errorDetails = parsedResponse.message;
    }
  }
  if (result.errorMessage === "" && result.errorDetails.length === 0) {
    result.errorMessage = error;
  }
  return result;
}