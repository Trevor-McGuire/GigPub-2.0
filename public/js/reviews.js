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
    const venueId = event.target.parentElement.querySelector('.venue').dataset.venueid;

    fetch(`/api/reviews/${venueId}`)
    .then((response) => {
      if (response.ok){
      return response.json();
    } else {
        throw new Error('failed to fetch reviews');
      }
      })
      .then((reviews) => {
        console.log(reviews);
        
        // Assuming you have an element with the class "reviews-container" to display the reviews
        const reviewsContainer = document.querySelector('.reviews-container');
        
        // Clear the existing reviews
        reviewsContainer.innerHTML = '';
        
        // Iterate through the reviews and create HTML elements to display each review
        reviews.forEach(review => {
          const reviewElement = document.createElement('div');
          reviewElement.innerHTML = `
            <span>${review.text}</span>
          `;
          reviewsContainer.appendChild(reviewElement);
        });
      })
      .catch((error) => {
        console.log(error);
      });
        const card = event.target.closest('.card'); 
        console.log(card)
        const commentsSection = card.querySelector('.comments-card')
        
        document.querySelector('.reviews-container').style.display = document.querySelector.style.display === 'none' ? 'block' : 'none';
  });
});