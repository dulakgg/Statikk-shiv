import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src="/favicon.svg" className="h-10 w-10 mr-2" alt="logo" />
    );
}
