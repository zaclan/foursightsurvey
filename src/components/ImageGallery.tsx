import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  questionId: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, questionId }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
      <div className={`question-images ${images.length > 1 ? 'multi-image' : 'single-image'}`}>
        {images.map((imageUrl, index) => (
          <div 
            key={index} 
            className="image-container" 
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={imageUrl} 
              alt={`Image for question ${questionId} (${index + 1})`} 
            />
            {images.length > 1 && (
              <div className="image-number">{index + 1}</div>
            )}
          </div>
        ))}
      </div>

      {/* Image Modal for enlarged view */}
      {selectedImageIndex !== null && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-button" onClick={closeModal}>×</button>
            <img 
              src={images[selectedImageIndex]} 
              alt={`Enlarged view of image ${selectedImageIndex + 1}`}
              className="enlarged-image" 
            />
            {images.length > 1 && (
              <div className="image-navigation">
                <button 
                  disabled={selectedImageIndex === 0}
                  onClick={() => setSelectedImageIndex(prev => prev !== null ? prev - 1 : null)}
                >
                  Previous
                </button>
                <span>{selectedImageIndex + 1} / {images.length}</span>
                <button 
                  disabled={selectedImageIndex === images.length - 1}
                  onClick={() => setSelectedImageIndex(prev => prev !== null ? prev + 1 : null)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
