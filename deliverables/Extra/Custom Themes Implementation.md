# Custom Themes Implementation

### The goal

Have a html select element with different themes options.  When changing the option the theme should automagically be applied.

### How does it work?

#### The themes Map

Our themes are stored as a Map with the theme names as keys and another Map as values. These inner maps are pairs of css variables and HEX Color values. These are set later in code for use in css. We need the themesKeys and selectedTheme variable for the html.

```typescript
  themes: Map<String, Map<String, String>> = new Map([
    ["light", new Map([
      ["--clr-alpha", "#E77170"],
      ["--clr-beta", "#C2CAD0"],
      ["--clr-gamma", "#C2B9B0"],
      ["--clr-delta", "#7E685A"],
      ["--clr-epsilon", "#AFD275"],
      ["--clr-zeta", "#222222"]
    ])],
    ["dark", new Map([
        ["--clr-alpha", "#0C0032"],
        ["--clr-beta", "#190061"],
        ["--clr-gamma", "#240090"],
        ["--clr-delta", "#3500D3"],
        ["--clr-epsilon", "#282828"],
        ["--clr-zeta", "#DDDDDD"]
    ])]
  ]);
  themesKeys:String[] = Array.from(this.themes.keys());
  selectedTheme: String = "light";
```

Why greek names?

Names based on color => Doesn't work because we have different colors for different themes.

Names based on usage => What if use a color for multiple things? Also we have way more usages than colors.

Proud Maths student => Greek names



#### Toggle theme

With the following method we can set the css variables. When adding in new themes or more variables we don't have to change the method. The selectedTheme is just the name of the theme we want which is the key to the them Map in the themes Map. For each value-key pair within the theme the css variable is then set accordingly.

```typescript
toggleTheme(): void {
    const theme: Map<String, String> = this.themes.get(this.selectedTheme);
    theme.forEach((value: string, key: string) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
```



#### The select tag

With that in place we just need a select tag for the options. We can do that without having to change it later similarly to the toggleTheme() method by iterating over the keys stored in themesKeys and binding the selected value to selectedTheme.

```html
<select style="margin-right: 50px;" *ngIf="themes" [(ngModel)]="selectedTheme" (change)="toggleTheme()">
      <option *ngFor="let theme of themesKeys" [value]="theme">
         {{ theme }}
      </option>
   </select>
```



#### Usage

Now everything is in place. We can then use the variables in css as we would normally.

```css
.submit-btn {
	color: var(--clr-zeta);
	background-color: var(--clr-alpha);
}
```