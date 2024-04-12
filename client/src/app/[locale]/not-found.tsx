import Link from 'next/link'

export default function NotFound(): JSX.Element {
    return (
        <div>
            <h2>Bunday sahifa topilmadi</h2>
            <Link href="/">Bosh sahifaga o`tish</Link>
        </div>
    );
}/**
 * Component for rendering the NotFound page.
 *
 * @return {JSX.Element} The JSX element representing the NotFound page.
 */
