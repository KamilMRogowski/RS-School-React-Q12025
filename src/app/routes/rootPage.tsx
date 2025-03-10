import { redirect } from 'react-router';

// eslint-disable-next-line @typescript-eslint/require-await
export async function loader() {
  return redirect('/page/1');
}

export default function RootPage() {
  return;
}
