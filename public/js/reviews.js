  const reviewsFormHandler = async (event) => {
    
    event.preventDefault();
    const form = event.target
    const selectedEvent = form.parentElement.parentElement;
    const text = form.querySelector('.newreview-text').value.trim();
    const stars = form.querySelector('.newreview-stars').value.trim();
    const venueIdEl = selectedEvent.querySelector('.venue')
    console.log(venueIdEl)
    const venueId = venueIdEl.dataset.venueid
    console.log(venueId);
    if (text && stars && venueId) {
      const response = await fetch(`/api/reviews/${venueId}`, {
        method: 'POST',
        body: JSON.stringify({ text, stars, venueId }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to save review.');
      }
    } else {
      console.error('Failed form validation.')
      alert('Missing form input')
    }
  };

  document
  .querySelectorAll('.newreview-form')
  .forEach(item => item.addEventListener('submit', reviewsFormHandler))
