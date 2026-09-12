"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
};

type ApiResponse = {
  success: boolean;
  data: College[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
};

function formatFees(fees: number) {
  return `INR ${(fees / 100000).toFixed(1)}L`;
}

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadColleges = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (city) params.set("city", city);
        if (state) params.set("state", state);
        if (minRating) params.set("minRating", minRating);
        if (maxFees) params.set("maxFees", maxFees);

        params.set("page", String(page));
        params.set("limit", "6");

        const response = await fetch(`/api/colleges?${params.toString()}`);
        const result: ApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to fetch colleges");
        }

        setColleges(result.data);
        setTotalPages(result.pagination.totalPages);
        setTotal(result.pagination.total);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load colleges"
        );
      } finally {
        setLoading(false);
      }
    };

    void loadColleges();
  }, [page, search, city, state, minRating, maxFees]);

  const toggleCompare = (id: number) => {
    setCompareIds((current) => {
      if (current.includes(id)) {
        return current.filter((collegeId) => collegeId !== id);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, id];
    });
  };

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setState("");
    setMinRating("");
    setMaxFees("");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-900">
            CollegeFinder
          </h1>
          <p className="mt-1 text-slate-500">
            Find and compare colleges using real database-backed data.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <input
              type="text"
              placeholder="Search colleges..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(event) => {
                setState(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <select
              value={minRating}
              onChange={(event) => {
                setMinRating(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Min Rating</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="4.7">4.7+</option>
              <option value="4.8">4.8+</option>
            </select>

            <select
              value={maxFees}
              onChange={(event) => {
                setMaxFees(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border px-4 py-3 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Max Fees</option>
              <option value="800000">INR 8L</option>
              <option value="900000">INR 9L</option>
              <option value="1000000">INR 10L</option>
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </section>

        {compareIds.length >= 2 && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
            <p className="text-sm font-medium text-blue-900">
              {compareIds.length} colleges selected for comparison
            </p>

            <Link
              href={`/compare?ids=${compareIds.join(",")}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Compare
            </Link>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Colleges
          </h2>

          <p className="text-sm text-slate-500">
            {total} colleges found
          </p>
        </div>

        {loading && (
          <div className="py-16 text-center text-slate-500">
            Loading colleges...
          </div>
        )}

        {!loading && error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && colleges.length === 0 && (
          <div className="mt-6 rounded-xl border bg-white p-10 text-center text-slate-500">
            No colleges found. Try changing your filters.
          </div>
        )}

        {!loading && !error && colleges.length > 0 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => {
              const selected = compareIds.includes(college.id);

              return (
                <article
                  key={college.id}
                  className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                        {college.type}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        {college.name}
                      </h3>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                      {college.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    {college.location}, {college.city}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Annual Fees</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {formatFees(college.fees)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Placement</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {college.placementRate}%
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Average Package</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {formatFees(college.averagePackage)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Highest Package</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {formatFees(college.highestPackage)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/colleges/${college.id}`}
                      className="flex-1 rounded-lg border px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => toggleCompare(college.id)}
                      className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${
                        selected
                          ? "bg-blue-600 text-white"
                          : "border text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {selected ? "Selected" : "Compare"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border bg-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
