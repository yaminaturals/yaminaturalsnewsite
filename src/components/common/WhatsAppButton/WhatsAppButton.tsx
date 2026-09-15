import React from 'react';
import './WhatsAppButton.css';

export interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '918780664057',
  defaultMessage = 'Hi',
}) => {
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Chat with Yami Naturals on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      {/* Official WhatsApp Vector Icon */}
      <svg
        className="whatsapp-float-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.771.815 2.796.815 3.18 0 5.767-2.587 5.768-5.766.001-3.182-2.585-5.768-5.768-5.768zm0 10.455c-.879 0-1.637-.253-2.368-.687l-.17-.101-1.579.414.421-1.538-.111-.177c-.476-.757-.727-1.554-.726-2.433.001-2.477 2.016-4.492 4.495-4.492 2.478 0 4.493 2.015 4.494 4.492 0 2.478-2.015 4.494-4.495 4.494zm2.628-3.342c-.144-.072-.852-.42-1.025-.492-.172-.072-.298-.108-.423.072-.125.18-.485.492-.594.6-.109.108-.218.12-.362.048-.144-.072-.609-.225-1.16-.716-.429-.382-.718-.854-.803-.999-.084-.144-.009-.222.063-.294.065-.064.144-.168.218-.252.072-.084.096-.144.144-.24.048-.096.024-.18-.012-.252-.036-.072-.423-1.02-.579-1.396-.153-.366-.308-.316-.423-.322-.109-.006-.234-.007-.36-.007-.125 0-.329.048-.501.24-.172.192-.658.643-.658 1.568 0 .925.673 1.819.768 1.951.096.132 1.325 2.023 3.21 2.837.449.194.799.31 1.072.397.45.143.86.123 1.184.075.361-.054 1.11-.454 1.266-.893.156-.44.156-.817.109-.893-.046-.076-.17-.12-.314-.192zM12.012 2.012C6.5 2.012 2.012 6.5 2.012 12.012c0 1.97.574 3.807 1.567 5.358L2 22.023l4.789-1.543a9.96 9.96 0 005.223 1.532c5.512 0 10-4.488 10-10 0-5.512-4.488-10-10-10zm0 18.256c-1.637 0-3.167-.478-4.462-1.3l-.32-.204-2.836.913.929-2.766-.223-.338a8.217 8.217 0 01-1.353-4.561c0-4.557 3.708-8.265 8.265-8.265 4.557 0 8.265 3.708 8.265 8.265 0 4.557-3.708 8.256-8.265 8.256z" />
      </svg>
      {/* Gentle floating pulse ring */}
      <span className="whatsapp-float-pulse" aria-hidden="true" />
      <span className="whatsapp-tooltip" role="tooltip">Chat with us</span>
    </a>
  );
};
