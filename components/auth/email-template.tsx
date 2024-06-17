import * as React from 'react';

interface EmailTemplateProps {
  LinkHref: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  LinkHref,
  message,
}) => {
  return (
    <div>
      <h1>Click the link below to {message}</h1>
      <a href={LinkHref}>{LinkHref}</a>
    </div>
  );
};
