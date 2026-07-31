-- Migration 14: Update tracks and schedule content to align with official TUK Frontier Concept Note

-- 1. Refresh official tracks in tuk_hackathon_tracks
DELETE FROM public.tuk_hackathon_tracks WHERE organization_id IS NULL;

INSERT INTO public.tuk_hackathon_tracks (title, description, prize_pool, image_url)
VALUES 
  (
    'Geospatial & Earth Observation Innovation', 
    'GIS, remote sensing, satellite imagery, drone data, and spatial analytics for urban planning, disaster risk management, environmental monitoring, and climate adaptation. Anchored by KUZA–TUK.', 
    'Track Awards & Incubation', 
    'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80'
  ),
  (
    'Artificial Intelligence & Data Science', 
    'AI applications, machine learning models, NLP, computer vision, and data analytics for health, education, agriculture, finance, and public service delivery.', 
    'Track Awards & Incubation', 
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  ),
  (
    'Smart Infrastructure & Built Environment', 
    'Smart buildings, structural health monitoring, BIM-enabled project management, smart construction tech, and sustainable energy integration. Anchored by ASA–TUK.', 
    'Track Awards & Incubation', 
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  ),
  (
    'Climate Tech & Environmental Engineering', 
    'Clean energy, water resources management, carbon monitoring, green infrastructure, waste-to-energy, and sustainable agriculture solutions.', 
    'Track Awards & Incubation', 
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80'
  ),
  (
    'Health Technology & Bioinformatics', 
    'Medical device prototyping, telemedicine, health data analytics, disease surveillance, genomic data analysis, and AI-assisted diagnostics.', 
    'Track Awards & Incubation', 
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'
  ),
  (
    'Financial Technology & Digital Inclusion', 
    'Fintech for financial inclusion, digital payments, alternative credit scoring, SME financial services, and blockchain applications.', 
    'Track Awards & Incubation', 
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80'
  );
