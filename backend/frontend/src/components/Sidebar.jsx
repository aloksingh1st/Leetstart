import React, { useState, useEffect } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore.js";
import PlaylistItem from "./PlaylistItem";
import { BookOpenCheck, Loader2 } from "lucide-react";

const Sidebar = () => {


    const [showModal, setShowModal] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");
    const [errors, setErrors] = useState({});
    const { isLoading, getAllPlaylists, createPlaylist, playlists } = usePlaylistStore();

    useEffect(() => {
        getAllPlaylists();
    }, [getAllPlaylists]);

    const resetForm = () => {
        setPlaylistName("");
        setPlaylistDescription("");
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!playlistName.trim()) newErrors.playlistName = "Playlist name is required.";
        return newErrors;
    };

    const handleCreate = async(e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const newPlaylist = {
            name: playlistName.trim(),
            description: playlistDescription.trim(),
        };

        createPlaylist(newPlaylist);
        resetForm();
        setShowModal(false);
    };




    return (
        <>
            <div className="p-2 border-r shadow-sm bg-white text-gray-900 dark:bg-[#171e2d] dark:text-gray-100 border-gray-200 dark:border-[#131c2c]">
                <div className="flex justify-between items-center text-xs opacity-60 px-2 mb-2">
                    <span className="text-gray-800 dark:text-gray-200">My Lists</span>
                    <button className="btn btn-xs btn-outline dark:border-gray-600 dark:text-gray-200" onClick={() => setShowModal(true)}>
                        + New
                    </button>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[85vh] pr-1">

                    {
                        isLoading && <div className="flex justify-center align-center">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Loading...
                        </div>
                    }
                    {playlists.map((playlist) => (
                        <PlaylistItem key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-[#131c2c] rounded-lg shadow-lg p-6 w-80">
                        <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-zinc-200">
                            Create New Playlist
                        </h2>
                        <form onSubmit={handleCreate}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className={`input input-bordered w-full ${errors.playlistName ? "input-error" : ""
                                        } text-gray-800 dark:text-gray-200 dark:bg-[#171e2d]`}
                                    placeholder="Playlist name"
                                    value={playlistName}
                                    onChange={(e) => setPlaylistName(e.target.value)}
                                />
                                {errors.playlistName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.playlistName}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <textarea
                                    className="textarea textarea-bordered w-full text-gray-800 dark:text-gray-200 dark:bg-[#171e2d]"
                                    rows={3}
                                    placeholder="Description (optional)"
                                    value={playlistDescription}
                                    onChange={(e) => setPlaylistDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="btn btn-outline btn-sm dark:border-gray-600 dark:text-gray-200"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary btn-sm">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
