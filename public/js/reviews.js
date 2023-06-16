const reviewsFormHandler = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#newreview-text').value.trim();
    const stars = document.querySelector('#newreview-stars').value.trim();
    const venueId = document.querySelector('#newreview-venueId').value.trim();
  
    if (text && stars && venueId) {
      // const venueData = await fetch (need api data here)
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
  .querySelector('#newreview-form')
  .addEventListener('submit', reviewsFormHandler);