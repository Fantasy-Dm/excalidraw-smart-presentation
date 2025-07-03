export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const requestHost = url.host;

  if (!requestHost.endsWith("fantasydm.top")) {
    return await fetch(context.env.ErrorPagePath, {
      headers: {
        fetchagent: "CloudflareWorker",
      },
    });
  }

  return context.next(); // 继续处理请求
}
