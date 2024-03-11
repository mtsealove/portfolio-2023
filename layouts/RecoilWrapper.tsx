'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface Props {
    children: ReactNode;
}

const RecoilWrapper = ({ children }:Props) => (
    <RecoilRoot>
        {children}
    </RecoilRoot>
);

export default RecoilWrapper;
