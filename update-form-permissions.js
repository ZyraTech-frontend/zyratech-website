const fs = require('fs');
const path = require('path');

const pagesToUpdate = [
    {
        file: 'src/pages/admin/gallery/AlbumFormPage.jsx',
        permission: 'gallery',
        action: 'create or edit albums'
    },
    {
        file: 'src/pages/admin/blog/BlogFormPage.jsx',
        permission: 'blog_articles',
        action: 'create or edit blog articles'
    },
    {
        file: 'src/pages/admin/faq/FaqFormPage.jsx',
        permission: 'content',
        action: 'create or edit FAQ items'
    },
    {
        file: 'src/pages/admin/jobs/JobFormPage.jsx',
        permission: 'jobs',
        action: 'create or edit jobs'
    },
    {
        file: 'src/pages/admin/projects/ProjectFormPage.jsx',
        permission: 'projects',
        action: 'create or edit projects'
    },
    {
        file: 'src/pages/admin/content/ServiceFormPage.jsx',
        permission: 'content',
        action: 'create or edit services'
    },
    {
        file: 'src/pages/admin/content/TimelineItemFormPage.jsx',
        permission: 'content',
        action: 'create or edit timeline items'
    },
    {
        file: 'src/pages/admin/content/HeroSlideFormPage.jsx',
        permission: 'content',
        action: 'create or edit hero slides'
    },
    {
        file: 'src/pages/admin/content/PartnershipStoryFormPage.jsx',
        permission: 'content',
        action: 'create or edit partnership stories'
    },
    {
        file: 'src/pages/admin/content/MilestoneFormPage.jsx',
        permission: 'content',
        action: 'create or edit milestones'
    },
    {
        file: 'src/pages/admin/testimonials/TestimonialsFormPage.jsx',
        permission: 'testimonials',
        action: 'create or edit testimonials'
    },
    {
        file: 'src/pages/admin/training/CourseFormPage.jsx',
        permission: 'training_courses',
        action: 'create or edit courses'
    },
    {
        file: 'src/pages/admin/impact/ImpactStoryFormPage.jsx',
        permission: 'impact',
        action: 'create or edit impact stories'
    },
    {
        file: 'src/pages/admin/impact/ImpactMetricFormPage.jsx',
        permission: 'impact',
        action: 'create or edit impact metrics'
    }
];

pagesToUpdate.forEach(({ file, permission, action }) => {
    if (!fs.existsSync(file)) {
        console.log(`❌ File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Check if already has permission check
    if (content.includes('userPermissions?.includes')) {
        console.log(`✅ ${file} - already has permission checks`);
        return;
    }

    // Add useDispatch import if missing
    if (!content.includes('useDispatch')) {
        content = content.replace(
            /import \{ useParams, useNavigate \}/,
            "import { useDispatch } from 'react-redux';\nimport { useParams, useNavigate }"
        );
    }

    // Add addNotification import if missing
    if (!content.includes('addNotification')) {
        content = content.replace(
            /import \{ useDispatch \} from 'react-redux';/,
            "import { useDispatch } from 'react-redux';\nimport { addNotification } from '../../../store/slices/uiSlice';"
        );
    }

    // Add useAuth import if missing
    if (!content.includes("import { useAuth }")) {
        content = content.replace(
            /import \{ useParams, useNavigate \}/,
            "import { useAuth } from '../../../hooks/useAuth';\nimport { useParams, useNavigate }"
        );
    }

    // Find the component function
    const componentMatch = content.match(/const \w+Page = \(\) => \{/);
    if (!componentMatch) {
        console.log(`❌ ${file} - could not find component function`);
        return;
    }

    // Add hook calls after component declaration
    const insertPos = content.indexOf(componentMatch[0]) + componentMatch[0].length;
    const permVarName = 'Can' + permission.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    
    const hooksCode = `
    const dispatch = useDispatch();
    const { userPermissions } = useAuth();
    
    // Permission checks
    const can${permVarName} = userPermissions?.includes('${permission}') ?? false;

    const handlePermissionDenied = () => {
        dispatch(addNotification({
            type: 'error',
            title: 'Permission Required',
            message: 'You do not have permission to ${action}.',
            description: 'Contact Super Admin at admin@zyratechhub.com',
            duration: 6000
        }));
    };
`;

    // Insert hooks code (but check if already present)
    if (!content.includes('const handlePermissionDenied')) {
        content = content.slice(0, insertPos) + hooksCode + content.slice(insertPos);
    }

    // Add permission check to handleSubmit
    content = content.replace(
        /const handleSubmit = async \(e\) => \{\s*e\.preventDefault\(\);/,
        `const handleSubmit = async (e) => {
        if (!can${permVarName}) { handlePermissionDenied(); return; }
        e.preventDefault();`
    );

    fs.writeFileSync(file, content);
    console.log(`✅ Updated ${file}`);
});

console.log('Done!');
