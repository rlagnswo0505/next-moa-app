import React, { AllHTMLAttributes, Attributes, useEffect, useRef } from 'react';

function Script({ onLoad, ...props }: AllHTMLAttributes<HTMLScriptElement>) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.onload = onLoad;
  }, []);

  return <script async ref={ref} {...props} />;
}

export default Script;
