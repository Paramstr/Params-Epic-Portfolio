export const projects = [
  {
    name: "Detection of Armillaria Root Rot Using ML Classification of Multispectral Data",
    categories: ['Research', 'Computer Vision', 'Spectral Analysis'],
    description: 'Engineering Honours research project using modified ResNet50 to detect Armillaria root rot in cherry trees through multi-spectral imaging analysis (RGB + NIR bands). The system processes aerial imagery to identify early signs of disease.',
    year: '2024',
    highlight: true,
    longDescription: `Using a custom-modified ResNet50 architecture, this research project achieved 94% accuracy in early detection of Armillaria root rot in cherry orchards. The system processes multi-spectral imagery (RGB + NIR) captured by UAVs to identify subtle spectral signatures associated with early-stage infection.

    Key achievements:
    • Reduced detection time from 3 weeks to 48 hours
    • Processed 10,000+ aerial images
    • Implemented real-time analysis pipeline`,
    images: [
      '/images/param_looking_into_distance.png',
      '/images/param_looking_into_distance.png',
      '/images/param_looking_into_distance.png'
    ],
    technologies: ['PyTorch', 'OpenCV', 'TensorFlow', 'Docker']
  },
  {
    name: "Sahha LLM | Exploring Large Language Models For Health Biomarker Analysis",
    categories: ['Work', 'Machine Learning'],
    description: 'This project explores the use of large language models (LLMs) for biomarker analysis and health recommendations using time series data.',
    year: '2024',
    link: 'https://sahha-llm.netlify.app/',
    longDescription: `Developed an innovative health analytics platform that leverages LLMs to interpret complex biomarker data and provide personalized health insights. The system processes multiple data streams including sleep patterns, activity levels, and vital signs.

    Key features:
    • Real-time health metric analysis
    • Personalized wellness recommendations
    • Integration with wearable devices`,
    images: [
      '/images/param_looking_into_distance.png',
      '/images/param_looking_into_distance.png',
      '/images/param_looking_into_distance.png'
    ],
    technologies: ['Next.js', 'Python', 'TensorFlow', 'AWS']
  },
  {
    name: "Edge Device Invoice Data Extraction Using Offline LLMs",
    categories: ['Work', 'Machine Learning', 'iOS Development', 'Computer Vision'],
    description: 'Produced an iOS application that digitises handwritten construction documents using compressed large language models and adaptive image processing. The system operates completely offline and was developed for a major Australia/New Zealand construction firm to streamline on-site document processing.',
    year: '2024',
  },

  {
    name: "Autonomous Line-Following Robot with Path Planning",
    categories: ['University', 'Embedded Systems', 'PCB Design', 'Robotics'],
    description: 'Development of a two-wheeled autonomous robot utilizing custom PCB-mounted photosensors for maze navigation. The system combines analog circuit design for line detection with pathfinding algorithms implemented on a PSoC 5 microcontroller, enabling shortest-path navigation and precise speed control through projected mazes.',
    year: '2023',
    }

];

