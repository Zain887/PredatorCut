import { v4 as uuidv4 } from 'uuid';
import { HeaderImages, Category } from './types'; // Your custom types

// Header images data
export const headerImages: HeaderImages[] = [
    { id: uuidv4(), url: '/headerImages/sword-1.jpg', article: 'Swords' },
    { id: uuidv4(), url: '/headerImages/AXE-1.jpg', article: 'Axes' },
    { id: uuidv4(), url: '/headerImages/Kitchenknives-1.jpg', article: 'Kitchen knives' },
    { id: uuidv4(), url: '/headerImages/HuntingKnifes.jpg', article: 'Hunting knives' },
    { id: uuidv4(), url: '/headerImages/dental.jpg', article: 'Dental Instruments' },
    { id: uuidv4(), url: '/headerImages/beautiInstrument.webp', article: 'Beauty Instruments' },
];

export const categories: Category[] = [
    {
        id: uuidv4(),
        name: 'Swords',
        description: 'All products related to swords.',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Combat Swords',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: '/axe.webp',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            },
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            },
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            },
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'Combat Swords2',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword2',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword2',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'Combat Swords',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'Combat Swords2',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword2',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword2',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'Combat Swords',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'Combat Swords2',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword2',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword2',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'Combat Swords',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            },
            {
                id: uuidv4(),
                name: 'Combat Swords2',
                description: 'Sharp and durable combat swords',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Viking Sword2',
                        description: 'A sharp and sturdy Viking-style sword.',
                        price: 250,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Hot Selling', 'Discount'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Amazing quality sword! Very sharp and durable.',
                                rating: 5,

                            },
                            {
                                id: uuidv4(),
                                user: 'John Doe',
                                comment: 'Great for battles!',
                                rating: 4,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Longsword2',
                        description: 'A classic longsword for enthusiasts.',
                        price: 300,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 3,
                        tag: ['Featured'],
                        comments: []
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Axes',
        description: 'All products related to axes.',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Throwing Axes',
                description: 'Perfect for throwing and sport.',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Throwing Axe',
                        description: 'A durable throwing axe perfect for sports and competition.',
                        price: 150,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 8,
                        tag: ['New Arrival', 'Featured'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Jane Smith',
                                comment: 'Perfect for throwing! Balanced and strong.',
                                rating: 4,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Kitchen Knives',
        description: 'All products related to kitchen knives.',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Chef’s Knives',
                description: 'Premium kitchen knives for chefs.',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Chef’s Knife',
                        description: 'A high-quality chef’s knife for professional use.',
                        price: 120,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 12,
                        tag: ['Featured', 'Hot Selling'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Emily Johnson',
                                comment: 'Best kitchen knife I’ve ever used!',
                                rating: 5,

                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Hunting Knives',
        description: 'All products related to hunting knives.',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Outdoor Hunting Knives',
                description: 'Reliable hunting knives for outdoor use.',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Hunting Knife',
                        description: 'A durable hunting knife designed for outdoor adventures.',
                        price: 100,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 8,
                        tag: ['Outdoor', 'Featured'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Mark Thompson',
                                comment: 'Perfect for my camping trips!',
                                rating: 5,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Survival Knife',
                        description: 'A versatile knife for survival situations.',
                        price: 120,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 5,
                        tag: ['Survival', 'Best Seller'],
                        comments: []
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Dental Instruments',
        description: 'All products related to dental instruments.',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Dental Kits',
                description: 'Professional dental care tools.',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Dental Hygiene Kit',
                        description: 'Comprehensive dental hygiene kit for home use.',
                        price: 50,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 15,
                        tag: ['Best Seller'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Sarah Lee',
                                comment: 'Great kit! Everything I need for dental care.',
                                rating: 5,
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        name: 'Beauty Instruments',
        description: 'All products related to beauty instruments.',
        subcategories: [
            {
                id: uuidv4(),
                name: 'Facial Tools',
                description: 'Precision beauty tools for skincare.',
                products: [
                    {
                        id: uuidv4(),
                        name: 'Facial Roller',
                        description: 'A jade facial roller for smoother skin.',
                        price: 30,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 20,
                        tag: ['Popular'],
                        comments: [
                            {
                                id: uuidv4(),
                                user: 'Jessica Brown',
                                comment: 'Love this roller! It feels amazing on my skin.',
                                rating: 5,

                            }
                        ]
                    },
                    {
                        id: uuidv4(),
                        name: 'Face Massager',
                        description: 'Electric face massager for relaxation.',
                        price: 70,
                        imageUrl: 'https://via.placeholder.com/150',
                        quantity: 10,
                        tag: ['New Arrival'],
                        comments: []
                    }
                ]
            }
        ]
    }
];