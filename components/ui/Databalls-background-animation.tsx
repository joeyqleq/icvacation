import * as THREE from 'three';

interface AnimationOptions {
    container: HTMLElement;
    count?: number;
    speed?: number;
}

export class DataBallsAnimation {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private mesh: THREE.InstancedMesh;
    private dummy = new THREE.Object3D();

    // Exact color palette from the PyCharm Data Science page
    private colors = [
        new THREE.Color('#27af71'), // Green
        new THREE.Color('#087cfa'), // Blue
        new THREE.Color('#ffc800'), // Yellow
    ];

    private particles: Array<{
        pos: THREE.Vector3;
        vel: THREE.Vector3;
    }> = [];

    constructor({ container, count = 250, speed = 0.005 }: AnimationOptions) {
        // 1. Scene Setup
        this.scene = new THREE.Scene();

        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 12;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);

        // 2. Geometry & Material (Low-poly spheres for performance)
        const geometry = new THREE.SphereGeometry(0.12, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            roughness: 0.1,
            metalness: 0.5,
        });

        // 3. Instanced Mesh (Efficient rendering)
        this.mesh = new THREE.InstancedMesh(geometry, material, count);

        for (let i = 0; i < count; i++) {
            const pos = new THREE.Vector3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 8
            );

            const vel = new THREE.Vector3(
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * speed,
                (Math.random() - 0.5) * speed
            );

            this.particles.push({ pos, vel });

            this.dummy.position.copy(pos);
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);

            // Assign random color from palette
            this.mesh.setColorAt(i, this.colors[Math.floor(Math.random() * this.colors.length)]);
        }

        this.scene.add(this.mesh);

        // 4. Lighting (Matches the shaded 3D look)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        // 5. Start Loop
        this.animate();

        // 6. Handle Resize
        window.addEventListener('resize', () => this.onResize(container));
    }

    private onResize(container: HTMLElement) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    private animate = () => {
        requestAnimationFrame(this.animate);

        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            p.pos.add(p.vel);

            // Boundaries (Soft bounce)
            if (Math.abs(p.pos.x) > 12) p.vel.x *= -1;
            if (Math.abs(p.pos.y) > 8) p.vel.y *= -1;
            if (Math.abs(p.pos.z) > 5) p.vel.z *= -1;

            this.dummy.position.copy(p.pos);
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i, this.dummy.matrix);
        }

        this.mesh.instanceMatrix.needsUpdate = true;
        this.renderer.render(this.scene, this.camera);
    };
}