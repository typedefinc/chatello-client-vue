export default function useSocket(url: string) {
  return new WebSocket(url);
}
