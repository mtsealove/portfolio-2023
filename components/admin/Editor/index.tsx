import dynamic from 'next/dynamic';

const CsrEditor = dynamic(() => import('./HtmlEditor'), { ssr: false });

interface Prop {
    content: string;
    setContent: (c: string) => void;
    minHeight?: number;
}

const Editor = ({ content, setContent, minHeight }:Prop) => (
    <CsrEditor content={content}
               setContent={setContent}
               minHeight={minHeight} />
);

export default Editor;
