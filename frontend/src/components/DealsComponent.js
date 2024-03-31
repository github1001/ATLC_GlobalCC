import React from 'react';
import "./dealscomponent.css"

function DealsComponent() {
  const dealsData = [
    { title: '10% Off', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', discount: '10%' },
    { title: '20% Off', details: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', discount: '20%' },
    { title: 'Special Offer', details: 'Donec non nisi sit amet velit tincidunt interdum.', discount: '30%' },
    { title: 'Clearance Sale', details: 'Fusce id leo sit amet felis vestibulum accumsan.', discount: '40%' },
    { title: 'Limited Time Only', details: 'Suspendisse potenti. Maecenas tincidunt felis vitae aliquet varius.', discount: '15%' },
    { title: 'Flash Sale', details: 'Integer condimentum arcu nec nunc suscipit, et viverra felis consequat.', discount: '25%' }
  ];

  return (
    <div className="deals-container">
      {dealsData.map((deal, index) => (
        <div key={index} className="deal-card">
          <h3>{deal.title}</h3>
          <p>{deal.details}</p>
          <p>Discount: {deal.discount}</p>
        </div>
      ))}
    </div>
  );
}

export default DealsComponent;
