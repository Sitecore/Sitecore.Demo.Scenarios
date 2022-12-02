# Content and Page Creation

## Creating a page

1. Select the **Landing Pages** page in the Site tree, click on the three dots and create a **Demo Landing Page** from template **Landing Page With Promo Variant 1**.
   > ![Create a page](./media/page-creation-1.png)
   > ![Demo Landing Page](./media/page-creation-2.png)

2. Give it a name and select it in the Site tree. There should be a landing page created, containing a Hero Image at the top; a Page Title and Page Content inside one Container and a Promo inside another Container.

## Editing existing components using Styling and Rendering Variants

1. Collapse the left sidebar to focus on the right one. Select the **Promo** component. In the right sidebar expand the **Styling** section. You can select any of the Styles under the Promo section and show how they change the component. The first three (*Promo Accent Blue, Promo Accent Orange, Promo Accent Pink*) will change the color of the accent box behind the image. The last one (*Promo Reversed*) will move the image on the right side of the text.
   > ![Promo Styling](./media/page-creation-3.png)
   > ![Promo Styling](./media/page-creation-4.png)

2. Expand the **Advanced Styling** section. From there you can change the Rendering variant of the Promo. Select the **WithColumns** variant. Explain that because there is no accent box, the *Promo Accent Blue* class does not cause any visual changes, but the *Promo Reversed* class does. Go back to the **Styling** section and uncheck the classes to show the difference. From here you can show some basic content editing by deleting some of the text in the middle box.
   > ![Promo Rendering Variant](./media/page-creation-5.png)
   > ![Promo Styling](./media/page-creation-6.png)
   > ![Promo Content Editing](./media/page-creation-7.png)

## Creating a new section using the Grid system

1. Expand the left sidebar and go to the **Components** tab. In the **Page Structure** section, select the **Container** component. Drag and drop it above the existing Promo, in the **Main** placeholder, as shown in the screenshot.
   > ![Adding a Container](./media/page-creation-8.png)

2. Keeping the new Container component selected, go to the **Styling** section in the right sidebar. From the classes in the **Container** section select **Container Fullwidth**. From the classes in the **Backgrounds** section select **Background Dark**.
   > ![Styling the Container](./media/page-creation-9.png)

3. Drag and drop another **Container** inside the one that was added in the previous step. Keeping the new Container component selected, go to the **Styling** section in the right sidebar. From the classes in the **Spacing** section select the **Section Spacing** class for it.
   > ![Adding a Container](./media/page-creation-10.png)
   > ![Styling the Container](./media/page-creation-11.png)

4. In the **Page Content** section, select the **Rich Text** component. Drag and drop it inside the empty container. Assign the existing Rich Text datasource.
   > ![Adding a Rich Text component](./media/page-creation-12.png)
   > ![Selecting a datasource](./media/page-creation-13.png)

5. In the right sidebar Expand the **Large grid layout** section. Click the *Overwrite* button. In the Size section drag the slider to **6**.
   > ![Adjusting the Grid](./media/page-creation-14.png)
   > ![Adjusting the Grid](./media/page-creation-15.png)

6. From the **Media** section select the **Image** component and drag it below the existing Rich Text. Assign the existing Image datasource.
   > ![Adding an Image](./media/page-creation-16.png)
   > ![Selecting a datasource](./media/page-creation-17.png)
   > ![Selecting a datasource](./media/page-creation-18.png)

7. In the right sidebar Expand the **Large grid layout** section. Click the *Overwrite* button. In the Size section drag the slider to **6**.
   > ![Adjusting the Grid](./media/page-creation-19.png)

8. For both components (*Rich Text* and *Image*) in the **Vertical Alignment** Section select the **Center** option.
   > ![Vertical Alignment](./media/page-creation-20.png)

9. Collapse both sidebars, this will make the viewport wider and you will be able to show the vertical centering.
   > ![Vertical Alignment](./media/page-creation-21.png)

10. Expand both sidebars. In the top bar click on the **Tablet** icon, then on the **Mobile** icon. Show that the two components are stacked one above the other in those viewports.
    > ![Responsive Layout](./media/page-creation-22.png)
