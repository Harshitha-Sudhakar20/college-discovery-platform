"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  courses?: Course[];
};

type ApiResponse = {
  success: boolean;
  data: College[];
  error?: string;
};

function formatFees(value: number) {
  return `INR ${(value / 100000).toFixed(1)}L`;
}

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComparison = async () => {
      try {
        const ids = new URLSearchParams(window.location.search).get("ids");

        if (!ids) {
          throw new Error("No colleges selected for comparison.");
        }

        const response = await fetch(
          `/api/colleges/compare?ids=${encodeURIComponent(ids)}`
        );

        const result: ApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to compare colleges");
        }

        setColleges(result.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load comparison"
        );
      } finally {
        setLoading(false);
      }
    };

    void loadComparison();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-6 py-5">
            <h1 className="text-2xl font-bold text-slate-900">
              CollegeFinder
            </h1>
            <p className="text-sm text-slate-500">
              Compare colleges side by side
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <p className="text-slate-600">Loading comparison...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-6 py-5">
            <h1 className="text-2xl font-bold text-slate-900">
              CollegeFinder
            </h1>
            <p className="text-sm text-slate-500">
              Compare colleges side by side
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>

          <Link
            href="/"
            className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Back to all colleges
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-2xl font-bold text-slate-900">
            CollegeFinder
          </h1>
          <p className="text-sm text-slate-500">
            Compare colleges side by side
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to all colleges
        </Link>

        <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="w-48 border-b px-5 py-4 text-left text-sm font-semibold text-slate-700">
                    Comparison
                  </th>

                  {colleges.map((college) => (
                    <th
                      key={college.id}
                      className="border-b px-5 py-4 text-left"
                    >
                      <Link
                        href={`/colleges/${college.id}`}
                        className="text-lg font-bold text-slate-900 hover:text-blue-600"
                      >
                        {college.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border-b px-5 py-4 text-sm font-semibold text-slate-600">
                    Type
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="border-b px-5 py-4 text-sm text-slate-700"
                    >
                      {college.type}
                    </td>
                  ))}
                </tr>

                <tr className="bg-slate-50">
                  <td className="border-b px-5 py-4 text-sm font-semibold text-slate-600">
                    Location
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="border-b px-5 py-4 text-sm text-slate-700"
                    >
                      {college.location}, {college.city}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-b px-5 py-4 text-sm font-semibold text-slate-600">
                    Rating
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="border-b px-5 py-4 text-lg font-bold text-slate-900"
                    >
                      {college.rating.toFixed(1)}
                    </td>
                  ))}
                </tr>

                <tr className="bg-slate-50">
                  <td className="border-b px-5 py-4 text-sm font-semibold text-slate-600">
                    Annual Fees
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="border-b px-5 py-4 text-sm font-semibold text-slate-900"
                    >
                      {formatFees(college.fees)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-b px-5 py-4 text-sm font-semibold text-slate-600">
                    Placement Rate
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="border-b px-5 py-4 text-sm font-semibold text-slate-900"
                    >
                      {college.placementRate}%
                    </td>
                  ))}
                </tr>

                <tr className="bg-slate-50">
                  <td className="border-b px-5 py-4 text-sm font-semibold text-slate-600">
                    Average Package
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="border-b px-5 py-4 text-sm font-semibold text-slate-900"
                    >
                      {formatFees(college.averagePackage)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="border-b px-5 py-4 text-sm font-semibold text-slate-600">
                    Highest Package
                  </td>

                  {colleges.map((college) => (
                    <td
                      key={college.id}
                      className="border-b px-5 py-4 text-sm font-semibold text-slate-900"
                    >
                      {formatFees(college.highestPackage)}
                    </td>
                  ))}
                </tr>

                <tr className="bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                    Courses
                  </td>

                  {colleges.map((college) => (
                    <td key={college.id} className="px-5 py-4">
                      <ul className="space-y-2">
                        {college.courses?.map((course) => (
                          <li
                            key={course.id}
                            className="text-sm text-slate-700"
                          >
                            {course.name} ({course.duration} years)
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
