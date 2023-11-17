const detaBaseUrl = process.env.DETA_BASE_URL;
const detaApiKey = process.env.DETA_API_KEY;

const headers = new Headers();
headers.set("X-API-Key", detaApiKey as string);
headers.set("Content-Type", "application/json");

const detaGet = async (params: { baseName: string; key: string }) => {
  try {
    const response = await fetch(
      detaBaseUrl + params.baseName + "/items/" + params.key,
      { method: "GET", headers }
    );

    if (!response.ok) {
      const { statusText } = response;
      throw { message: statusText };
    }

    return response;
  } catch (e) {
    const { message } = e as any;
    return new Response(message, {
      status: 500,
      statusText: message,
    });
  }
};

const detaInsert = async (params: { baseName: string; payload: any }) => {
  return await fetch(detaBaseUrl + params.baseName + "/items", {
    method: "POST",
    headers,
    body: params.payload,
  });
  // try {
  //   const response = await fetch(detaBaseUrl + params.baseName + "/items", {
  //     method: "POST",
  //     headers,
  //     body: params.payload,
  //   });

  //   if (!response.ok) {
  //     const { statusText } = response;
  //     throw { message: statusText };
  //   }

  //   return response;
  // } catch (e) {
  //   const { message } = e as any;
  //   return new Response(message, {
  //     status: 500,
  //     statusText: message,
  //   });
  // }
};

const detaQuery = async (params: { baseName: string; payload: any }) => {
  try {
    const response = await fetch(detaBaseUrl + params.baseName + "/query", {
      method: "POST",
      headers,
      body: params.payload,
    });

    if (!response.ok) {
      const { statusText } = response;
      throw { message: statusText };
    }

    return response;
  } catch (e) {
    const { message } = e as any;
    return new Response(message, {
      status: 500,
      statusText: message,
    });
  }
};

export { detaGet, detaInsert, detaQuery };
