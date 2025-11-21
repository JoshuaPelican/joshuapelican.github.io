function getUniqueTags(projects, categoryOrder = ['tools', 'people', 'code', 'art', 'anim', 'audio', 'docs']) {
    const tagsByCategory = {};

    projects.forEach(project => {
        if (!project.tags) return;

        Object.entries(project.tags).forEach(([category, tags]) => {
            if (!tagsByCategory[category]) {
                tagsByCategory[category] = new Set();
            }
            tags.forEach(tag => tagsByCategory[category].add(tag));
        });
    });

    const result = {};
    categoryOrder.forEach(category => {
        if (tagsByCategory[category]) {
            result[category] = Array.from(tagsByCategory[category]).sort();
        }
    });

    return result;
}

function getUniqueTagsFlat(projects, categoryOrder = ['tools', 'people', 'code', 'art', 'anim', 'audio', 'docs']) {
  const tagMap = getUniqueTags(projects, categoryOrder);
  
  return Object.entries(tagMap).flatMap(([category, items]) =>
    items.map(item => ({ category, name: item }))
  );
}

function filterProjectsByTags(projects, activeTags, matchAny = true) {
    // If no active tags, return all project IDs
    if (activeTags.length === 0) {
        return Object.keys(projects);
    }

    return Object.entries(projects)
        .filter(([id, project]) => {
            if (!project.tags) return false;

            // Check if project matches the active tags
            const matches = activeTags.map(activeTag => {
                const categoryTags = project.tags[activeTag.category];
                return categoryTags && categoryTags.includes(activeTag.name);
            });

            // matchAny: at least one tag matches; !matchAny: all tags must match
            return matchAny ? matches.some(m => m) : matches.every(m => m);
        })
        .map(([id]) => id);
}