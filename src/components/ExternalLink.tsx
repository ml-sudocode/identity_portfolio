import React from 'react';

export const ExternalLink = ({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) => {
  return (
    <a href={href} className={className} target="_blank" rel="nofollow noopener noreferrer">{children}</a>
  )
}
