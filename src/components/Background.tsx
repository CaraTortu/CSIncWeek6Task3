"use client"

import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

const opt = {
    noiseScale: 0.002,
    angle: Math.PI / 2,
    h: 0,
    s1: 90,
    s2: 20,
    l1: 50,
    l2: 40,
    strokeWeight: 1.2,
    tail: 81
};

let Particles: Particle[] = [];
let time = 0;

class Particle {
    p5: p5Types;
    x: number;
    y: number;
    lx: number;
    ly: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    hueSeed: number;
    hue: number;
    sat: number;
    light: number;
    maxSpeed: number;


    constructor(x: number, y: number, p5: p5Types) {
        this.p5 = p5
        this.x = x;
        this.y = y;
        this.lx = x;
        this.ly = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.hue = opt.h;
        this.hueSeed = Math.random();
        this.sat = this.hueSeed > .5 ? opt.s1 : opt.s2;
        this.light = this.hueSeed > .5 ? opt.l1 : opt.l2;
        this.maxSpeed = this.hueSeed > .5 ? 3 : 2;
    }

    update() {
        this.follow();
        this.vx += this.ax;
        this.vy += this.ay;
        var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        var a = Math.atan2(this.vy, this.vx);
        var m = Math.min(this.maxSpeed, p);
        this.vx = Math.cos(a) * m;
        this.vy = Math.sin(a) * m;
        this.x += this.vx;
        this.y += this.vy;
        this.ax = 0;
        this.ay = 0;
        this.edges();
    }

    follow() {
        let angle = this.p5.noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale) * Math.PI * 0.5 + opt.angle;
        this.ax += Math.cos(angle);
        this.ay += Math.sin(angle);
    }
    
    updatePrev() {
        this.lx = this.x;
        this.ly = this.y;
    }

    edges() {
        if (this.x < 0) {
            this.x = this.p5.width;
            this.updatePrev();
        }

        if (this.x > this.p5.width) {
            this.x = 0;
            this.updatePrev();
        }

        if (this.y > this.p5.height) {
            this.y = 0;
            this.x = Math.random() * this.p5.width
            this.updatePrev();
        }
    }
    
    render() {
        this.p5.stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`);
        this.p5.line(this.x, this.y, this.lx, this.ly);
        this.updatePrev();
    }
}

const Background: React.FC = () => {

    // See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

        for (let i = 0; i < 500 ; i++) {
            Particles.push(new Particle(Math.random() * p5.width, Math.random() * p5.height, p5));
        }
        
        p5.strokeWeight(1.2)
    };

    const draw = (p5: p5Types) => {
        time++
        p5.background(0, 100 - opt.tail);
        for (let p of Particles) {
            p.update();
            p.render();
        }
    };

    const windowResized =  (p5: p5Types, _event?: UIEvent) => {
        Particles = []
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

        for (let i = 0; i < 500 ; i++) {
            Particles.push(new Particle(Math.random() * p5.width, Math.random() * p5.height, p5));
        }
    }

    return <Sketch setup={setup} draw={draw} windowResized={windowResized} className="fixed inset-0 m-auto -z-50" />;
};

export default Background