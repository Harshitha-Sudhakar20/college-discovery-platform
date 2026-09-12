"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Course = {
  id: number;
  name: string;
  duration: number;
};

type College = {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  type: string;
  fees: number;
  rating: number;
  placementRate: number;
  averagePackage: number;
  highestPackage: number;
  description: string | null;
  courses: Course[];
};

export default function CollegeDetails() {
  const params = useParams();
  const id = params.id;

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/colleges/${id}`);

        if (!response.ok) {
          throw new Error("College not found");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "Failed to load college");
        }

        setCollege(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCollege();
    }
  }, [id]);

  const formatFees = (amount: number) => {
    return `INR ${(amount / 100000).toFixed(1)}L`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center text-slate-500">
          Loading college details...
        </div>
      </main>
    );
  }

  if (error || !college) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error || "College not found"}
          </div>

          <Link
            href="/"
            className="mt-5 inline-block font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Back to colleges
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            CollegeFinder
          </Link>

          <p className="mt-1 text-sm text-slate-500">
            College details and courses
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ? Back to all colleges
        </Link>

        <div className="mt-5 rounded-2xl border bg-white p-7 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {college.type}
              </span>

              <h1 className="mt-4 text-3xl font-bold text-slate-900">
                {college.name}
              </h1>

              <p className="mt-2 text-slate-500">
                {college.location}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 px-5 py-3 text-center">
              <p className="text-xs font-medium text-amber-700">Rating</p>
              <p className="text-2xl font-bold text-amber-800">
                {college.rating}
              </p>
            </div>
          </div>

          {college.description && (
            <div className="mt-7 border-t pt-6">
              <h2 className="text-lg font-bold text-slate-900">
                About the College
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                {college.description}
              </p>
            </div>
          )}

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Annual Fees</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatFees(college.fees)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Placement Rate</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {college.placementRate}%
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Average Package</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatFees(college.averagePackage)}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Highest Package</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatFees(college.highestPackage)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Available Courses
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {college.courses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <h3 className="font-bold text-slate-900">
                  {course.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Duration: {course.duration} years
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
