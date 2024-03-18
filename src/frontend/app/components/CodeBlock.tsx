'use client';

import React, { useMemo, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type CodeBlockProps = {
  code: string;
  language: string;
};

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const notify = () => {
    copy();
  };

  const copy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const languageString = useMemo(() => {
    const languageString = language ? language.replace('language-', '') : 'plaintext';

    switch (languageString) {
      case 'html':
        return 'htmlbars';
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      default:
        return languageString;
    }
  }, [language]);

  return (
    <div className="code-block">
      <button>
        <CopyToClipboard text={code} onCopy={() => notify()}>
          {isCopied ? (
            <FontAwesomeIcon icon={faCheck} className="check-icon" />
          ) : (
            <FontAwesomeIcon icon={faCopy} className="copy-icon" />
          )}
        </CopyToClipboard>
      </button>
      <SyntaxHighlighter language={languageString} style={vs2015} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
