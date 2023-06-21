  const reviewsFormHandler = async (event) => {
    
    event.preventDefault();
    const form = event.target
    const selectedEvent = form.parentElement.parentElement.parentElement; 
    const text = form.querySelector('.newreview-text').value.trim();
    const stars = form.querySelector('.newreview-stars').value.trim();
    const venueIdEl = selectedEvent.querySelector('.venue')
    const venueId = venueIdEl.dataset.venueid
    if (text && stars && venueId) {
      const response = await fetch(`/api/reviews/${venueId}`, {
        method: 'POST', 
        body: JSON.stringify({ text, stars, venueId }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        window.alert('Review saved!');
        // document.location.replace('/');
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

  const commentsButtons = document.querySelectorAll('.comments-button');

  commentsButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      const venueElement = event.target.parentElement.parentElement.querySelector('.venue');
      const venueId = venueElement.dataset.venueid;
      
      try {
        const response = await fetch(`/api/reviews/${venueId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviews = await response.json();
  
        // Assuming you have an element with the class "reviews-container" to display the reviews
        const reviewsContainer = event.target.closest('.card').querySelector('.reviews-container');
        // Clear the existing reviews
        reviewsContainer.innerHTML = '';
  
        // Iterate through the reviews and create HTML elements to display each review
        reviews.forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.innerHTML = `<span>${review.text} Stars:${review.stars}</span>`;
          reviewsContainer.appendChild(reviewElement);
        });
  
        // Toggle the display of the reviews container
        reviewsContainer.style.display = reviewsContainer.style.display === 'block' ? 'none' : 'block';
      } catch (error) {
        console.log(error);
      }
    });
  });
  