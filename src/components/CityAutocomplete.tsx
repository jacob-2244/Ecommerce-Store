


"use client";

import React, { useState, useEffect } from "react";
import { Path, UseFormRegister, FieldValues, UseFormSetValue, FieldPathValue } from "react-hook-form";


type CitySuggestion = {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

type CityAutocompleteProps<T extends FieldValues> = {
    name: Path<T>;
    setValue: UseFormSetValue<T>;
    label: string;
    register: UseFormRegister<T>;
    error?: string;
}

export default function CityAutocomplete<T extends FieldValues>({
    name,
    label,
    register,
    setValue,
    error,
}: CityAutocompleteProps<T>) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Debounce logic to limit API calls
    useEffect(() => {
        const fetchCities = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&city=${encodeURIComponent(query)}&addressdetails=1&limit=5&dedupe=1`,
                    {
                        headers: {
                            "User-Agent": "My-React-App/1.0 (contact@example.com)",
                        },
                    }
                );
                const data: CitySuggestion[] = await res.json();
                setSuggestions(data);
            } catch (err) {
                console.error("Failed to fetch cities", err);
            } finally {
                setLoading(false);
            }
        };

        const handler = setTimeout(() => {
            fetchCities();
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    const handleSelect = (city: CitySuggestion) => {
        const selectedCity = city.display_name.split(',')[0].trim();
        setQuery(selectedCity);
        
        setValue(name, selectedCity as FieldPathValue<T, Path<T>>, { shouldValidate: true });

        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="flex-1 flex flex-col gap-2 relative">
            <label className="font-bold">{label}</label>
            <input
                {...register(name, { required: `${label} is required` })}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={`Enter Your ${label}`}
                className={`border px-2 py-4 rounded ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {showSuggestions && (suggestions.length > 0 || loading) && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-12 max-h-48 overflow-y-auto">
                    {loading && <li className="p-2 text-gray-500">Loading...</li>}
                    {!loading && suggestions.map((city) => (
                        <li
                            key={city.place_id}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onMouseDown={() => handleSelect(city)}
                        >
                            {city.display_name}
                        </li>
                    ))}
                    {!loading && suggestions.length === 0 && query.length >= 3 && (
                        <li className="p-2 text-gray-500">No cities found</li>
                    )}
                </ul>
            )}
        </div>
    );
}
