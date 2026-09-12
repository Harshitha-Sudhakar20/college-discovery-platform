import "dotenv/config";
import { db } from "./db";

const colleges = [
  {
    name: "IIT Bombay",
    location: "Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Public",
    fees: 850000,
    rating: 4.8,
    placementRate: 92,
    averagePackage: 2100000,
    highestPackage: 6800000,
    description:
      "Demo data for a leading engineering institute with strong academics, research, and placements.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Electrical Engineering", duration: 4 },
      { name: "Mechanical Engineering", duration: 4 },
    ],
  },
  {
    name: "IIT Delhi",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Public",
    fees: 900000,
    rating: 4.8,
    placementRate: 94,
    averagePackage: 2200000,
    highestPackage: 5500000,
    description:
      "Demo data for a premier engineering institute known for technology, research, and innovation.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Electrical Engineering", duration: 4 },
      { name: "Civil Engineering", duration: 4 },
    ],
  },
  {
    name: "IIT Madras",
    location: "Adyar, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Public",
    fees: 850000,
    rating: 4.9,
    placementRate: 93,
    averagePackage: 2150000,
    highestPackage: 6000000,
    description:
      "Demo data for a top engineering institute with strong technical and research programs.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Mechanical Engineering", duration: 4 },
      { name: "Artificial Intelligence and Data Science", duration: 4 },
    ],
  },
  {
    name: "IIT Hyderabad",
    location: "Kandi, Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "Public",
    fees: 820000,
    rating: 4.6,
    placementRate: 90,
    averagePackage: 1900000,
    highestPackage: 5000000,
    description:
      "Demo data for an engineering institute with a strong focus on technology and emerging fields.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Artificial Intelligence", duration: 4 },
      { name: "Electrical Engineering", duration: 4 },
    ],
  },
  {
    name: "IISc Bangalore",
    location: "Malleshwaram, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Public",
    fees: 400000,
    rating: 4.9,
    placementRate: 88,
    averagePackage: 1800000,
    highestPackage: 4500000,
    description:
      "Demo data for a research-focused institution offering advanced science and engineering programs.",
    courses: [
      { name: "Computer Science", duration: 4 },
      { name: "Data Science", duration: 4 },
      { name: "Electrical Engineering", duration: 4 },
    ],
  },
  {
    name: "NIT Trichy",
    location: "Tiruchirappalli",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: "Public",
    fees: 650000,
    rating: 4.5,
    placementRate: 89,
    averagePackage: 1400000,
    highestPackage: 4500000,
    description:
      "Demo data for a leading National Institute of Technology with strong engineering programs.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Electronics and Communication Engineering", duration: 4 },
      { name: "Mechanical Engineering", duration: 4 },
    ],
  },
  {
    name: "BITS Pilani",
    location: "Pilani",
    city: "Pilani",
    state: "Rajasthan",
    type: "Private",
    fees: 1800000,
    rating: 4.7,
    placementRate: 91,
    averagePackage: 1750000,
    highestPackage: 4500000,
    description:
      "Demo data for a private technical university known for flexible academics and strong industry links.",
    courses: [
      { name: "Computer Science", duration: 4 },
      { name: "Electronics and Instrumentation", duration: 4 },
      { name: "Mechanical Engineering", duration: 4 },
    ],
  },
  {
    name: "VIT Vellore",
    location: "Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    fees: 800000,
    rating: 4.3,
    placementRate: 87,
    averagePackage: 950000,
    highestPackage: 4500000,
    description:
      "Demo data for a private engineering university offering a wide range of technology programs.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Information Technology", duration: 4 },
      { name: "Electronics and Communication Engineering", duration: 4 },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal",
    city: "Manipal",
    state: "Karnataka",
    type: "Private",
    fees: 1400000,
    rating: 4.4,
    placementRate: 86,
    averagePackage: 1050000,
    highestPackage: 4500000,
    description:
      "Demo data for a private engineering institute with diverse technical programs and campus facilities.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Artificial Intelligence and Machine Learning", duration: 4 },
      { name: "Electronics and Communication Engineering", duration: 4 },
    ],
  },
  {
    name: "IIIT Hyderabad",
    location: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    type: "Private",
    fees: 1200000,
    rating: 4.7,
    placementRate: 92,
    averagePackage: 2000000,
    highestPackage: 5000000,
    description:
      "Demo data for a technology-focused institute specializing in computer science and related areas.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Computer Science and MS by Research", duration: 5 },
      { name: "Artificial Intelligence", duration: 4 },
    ],
  },
  {
    name: "RV College of Engineering",
    location: "Mysore Road, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Private",
    fees: 900000,
    rating: 4.2,
    placementRate: 84,
    averagePackage: 900000,
    highestPackage: 3500000,
    description:
      "Demo data for an engineering college in Bengaluru with strong industry connections.",
    courses: [
      { name: "Computer Science and Engineering", duration: 4 },
      { name: "Information Science and Engineering", duration: 4 },
      { name: "Electronics and Communication Engineering", duration: 4 },
    ],
  },
];

async function main() {
  const existingColleges = await db.orm.public.College.all();

  if (existingColleges.length > 0) {
    console.log(
      `Database already contains ${existingColleges.length} colleges. Skipping seed.`,
    );
    return;
  }

  for (const collegeData of colleges) {
    const college = await db.orm.public.College.create({
      name: collegeData.name,
      location: collegeData.location,
      city: collegeData.city,
      state: collegeData.state,
      type: collegeData.type,
      fees: collegeData.fees,
      rating: collegeData.rating,
      placementRate: collegeData.placementRate,
      averagePackage: collegeData.averagePackage,
      highestPackage: collegeData.highestPackage,
      description: collegeData.description,
    });

    for (const course of collegeData.courses) {
      await db.orm.public.Course.create({
        name: course.name,
        duration: course.duration,
        collegeId: college.id,
      });
    }
  }

  console.log(`Seeded ${colleges.length} colleges successfully.`);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});